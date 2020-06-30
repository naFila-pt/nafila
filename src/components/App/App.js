import React, { Component } from "react";

import readingTime from "reading-time";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline, Grid, Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import * as firebase from "firebase/app";
import { auth, firestore, analytics } from "../../firebase";
import authentication from "../../services/authentication";
import appearance from "../../services/appearance";

import ErrorBoundary from "../ErrorBoundary";
import LaunchScreen from "../LaunchScreen";
import Router from "../Router";

import CookieBanner from "../CookieBanner";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { QUEUE_POSTER_PATH } from "../../constants/RoutesConstants";

function detectIsDesktop() {
  return window.innerWidth >= 768;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialState = {
  ready: false,
  performingAction: false,
  theme: appearance.defaultTheme,
  user: null,
  userData: null,
  showCookieBanner: true,

  snackbar: {
    autoHideDuration: 0,
    message: "",
    open: false,
    severity: null
  },

  isMenuOpen: false,
  isDesktop: detectIsDesktop(),

  shouldSkipOnBoarding: false
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    try {
      this.state.shouldSkipOnBoarding = localStorage.getItem("skipOnBoarding");
    } catch (error) {}

    this.resizeHandler = () => {
      this.setState({
        isDesktop: detectIsDesktop() //setState only updates when needed
      });
    };
  }

  onRouteChanged = () => {
    switch (window.location.pathname) {
      case "/queue-status":
        this.setState({ showCookieBanner: false });
        break;
      default:
        break;
    }
  };

  toggleMenuOpen = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  resetState = callback => {
    this.setState(
      {
        ready: true,
        theme: appearance.defaultTheme,
        user: null,
        userData: null
      },
      callback
    );
  };

  setTheme = (theme, callback) => {
    if (!theme) {
      this.setState(
        {
          theme: appearance.defaultTheme
        },
        callback
      );

      return;
    }

    this.setState(
      {
        theme: appearance.createTheme(theme)
      },
      callback
    );
  };

  signOut = () => {
    this.setState(
      {
        performingAction: true
      },
      () => {
        authentication
          .signOut()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Signed out");
            });
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  openSnackbar = (message, autoHideDuration = 5, callback, severity = null) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
          severity
        }
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false,
        severity: null
      }
    });
  };

  render() {
    const {
      ready,
      performingAction,
      theme,
      user,
      userData,
      snackbar,
      isDesktop,
      shouldSkipOnBoarding,
      showCookieBanner
    } = this.state;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <ErrorBoundary>
            {!ready && <LaunchScreen />}

            {ready && (
              <>
                {showCookieBanner && (
                  <CookieBanner
                    handleBannerCloseClick={this.handleBannerCloseClick}
                  />
                )}
                <Grid container justify="center" style={{ height: "100%" }}>
                  {!window.location.pathname.startsWith(
                    `${QUEUE_POSTER_PATH.replace("/:queueId", "")}`
                  ) && (
                    <div
                      style={{ position: "absolute", left: "20px", zIndex: 1 }}
                    >
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.toggleMenuOpen}
                        edge="start"
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                  )}
                  <Grid
                    item
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Router
                      user={user}
                      userData={userData}
                      performingAction={performingAction}
                      openSnackbar={this.openSnackbar}
                      isDesktop={isDesktop}
                      shouldSkipOnBoarding={shouldSkipOnBoarding}
                    />
                  </Grid>
                </Grid>

                {snackbar.severity ? (
                  <Snackbar
                    open={snackbar.open}
                    autoHideDuration={snackbar.autoHideDuration}
                    onClose={this.closeSnackbar}
                  >
                    <Alert severity={snackbar.severity}>
                      {snackbar.message}
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    autoHideDuration={snackbar.autoHideDuration}
                    message={snackbar.message}
                    open={snackbar.open}
                    onClose={this.closeSnackbar}
                  />
                )}

                <BurgerMenu
                  userInfo={{ user, userData }}
                  isOpen={this.state.isMenuOpen}
                  toggleMenu={this.toggleMenuOpen}
                />
              </>
            )}
          </ErrorBoundary>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }

  componentDidMount() {
    this.onRouteChanged();

    this.onAuthStateChangedObserver = auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        auth.onAuthStateChanged(
          user => {
            // The user is not signed in or doesn’t have a user ID.
            if (!user || !user.uid) {
              if (this.userDocumentSnapshotListener) {
                this.userDocumentSnapshotListener();
              }

              this.resetState();

              return;
            }

            analytics.setUserId(user.uid);

            // The user is signed in, begin retrieval of external user data.
            this.userDocumentSnapshotListener = firestore
              .collection("users")
              .doc(user.uid)
              .onSnapshot(
                snapshot => {
                  const data = snapshot.data();

                  // The user doesn’t have a data point, equivalent to not signed in.
                  if (!snapshot.exists || !data) {
                    if (this.userDocumentSnapshotListener) {
                      this.userDocumentSnapshotListener();
                    }

                    this.resetState();

                    return;
                  }

                  authentication
                    .getRoles()
                    .then(value => {
                      this.setTheme(data.theme, () => {
                        this.setState({
                          ready: true,
                          user: user,
                          userData: data,
                          roles: value || []
                        });
                      });
                    })
                    .catch(reason => {
                      this.resetState(() => {
                        const code = reason.code;
                        const message = reason.message;

                        switch (code) {
                          default:
                            this.openSnackbar(message);
                            return;
                        }
                      });
                    });
                },
                error => {
                  this.resetState(() => {
                    const code = error.code;
                    const message = error.message;

                    switch (code) {
                      default:
                        this.openSnackbar(message);
                        return;
                    }
                  });
                }
              );
          },
          error => {
            this.resetState(() => {
              const code = error.code;
              const message = error.message;

              switch (code) {
                default:
                  this.openSnackbar(message);
                  return;
              }
            });
          }
        );
      });

    //auto-update mobile/desktop state on resize
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }

    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }

    window.removeEventListener("resize", this.resizeHandler);
  }
}

export default App;
