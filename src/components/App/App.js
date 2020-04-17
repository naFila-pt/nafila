import React, { Component } from "react";

import readingTime from "reading-time";

import { MuiThemeProvider } from "@material-ui/core/styles";

import { CssBaseline, Grid, Button, Snackbar } from "@material-ui/core";

import { auth, firestore } from "../../firebase";
import authentication from "../../services/authentication";
import appearance from "../../services/appearance";

import ErrorBoundary from "../ErrorBoundary";
import LaunchScreen from "../LaunchScreen";
import Router from "../Router";
import DialogHost from "../DialogHost";

import CookieBanner from "../CookieBanner";

const initialState = {
  ready: false,
  performingAction: false,
  theme: appearance.defaultTheme,
  user: null,
  userData: null,
  roles: [],

  aboutDialog: {
    open: false
  },

  signUpDialog: {
    open: false
  },

  signInDialog: {
    open: false
  },

  settingsDialog: {
    open: false
  },

  deleteAccountDialog: {
    open: false
  },

  signOutDialog: {
    open: false
  },

  snackbar: {
    autoHideDuration: 0,
    message: "",
    open: false
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetState = callback => {
    this.setState(
      {
        ready: true,
        theme: appearance.defaultTheme,
        user: null,
        userData: null,
        roles: []
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

  openDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = true;

    this.setState({ dialog }, callback);
  };

  closeDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = false;

    this.setState({ dialog }, callback);
  };

  closeAllDialogs = callback => {
    this.setState(
      {
        aboutDialog: {
          open: false
        },

        signUpDialog: {
          open: false
        },

        signInDialog: {
          open: false
        },

        settingsDialog: {
          open: false
        },

        deleteAccountDialog: {
          open: false
        },

        signOutDialog: {
          open: false
        }
      },
      callback
    );
  };

  deleteAccount = () => {
    this.setState(
      {
        performingAction: true
      },
      () => {
        authentication
          .deleteAccount()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Deleted account");
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

  openSnackbar = (message, autoHideDuration = 2, callback) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true
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
        open: false
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
      aboutDialog,
      signUpDialog,
      signInDialog,
      settingsDialog,
      deleteAccountDialog,
      signOutDialog,
      snackbar
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <ErrorBoundary>
          {!ready && <LaunchScreen />}

          {ready && (
            <>
              <CookieBanner
                handleBannerCloseClick={this.handleBannerCloseClick}
              />
              <Grid container justify="center" style={{ height: "100%" }}>
                <Grid
                  item
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxWidth: theme.breakpoints.values.sm,
                    maxHeight: 900
                  }}
                >
                  <Router user={user} openSnackbar={this.openSnackbar} />
                </Grid>
              </Grid>

              <DialogHost
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={this.openSnackbar}
                dialogs={{
                  aboutDialog: {
                    dialogProps: {
                      open: aboutDialog.open,

                      onClose: () => this.closeDialog("aboutDialog")
                    }
                  },

                  signUpDialog: {
                    dialogProps: {
                      open: signUpDialog.open,

                      onClose: callback => {
                        this.closeDialog("signUpDialog");

                        if (callback && typeof callback === "function") {
                          callback();
                        }
                      }
                    }
                  },

                  signInDialog: {
                    dialogProps: {
                      open: signInDialog.open,

                      onClose: callback => {
                        this.closeDialog("signInDialog");

                        if (callback && typeof callback === "function") {
                          callback();
                        }
                      }
                    }
                  },

                  settingsDialog: {
                    dialogProps: {
                      open: settingsDialog.open,

                      onClose: () => this.closeDialog("settingsDialog")
                    },

                    props: {
                      onDeleteAccountClick: () =>
                        this.openDialog("deleteAccountDialog")
                    }
                  },

                  deleteAccountDialog: {
                    dialogProps: {
                      open: deleteAccountDialog.open,

                      onClose: () => this.closeDialog("deleteAccountDialog")
                    },

                    props: {
                      deleteAccount: this.deleteAccount
                    }
                  },

                  signOutDialog: {
                    dialogProps: {
                      open: signOutDialog.open,

                      onClose: () => this.closeDialog("signOutDialog")
                    },

                    props: {
                      title: "Sign out?",
                      contentText:
                        "While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.",
                      dismissiveAction: (
                        <Button
                          color="primary"
                          onClick={() => this.closeDialog("signOutDialog")}
                        >
                          Cancel
                        </Button>
                      ),
                      confirmingAction: (
                        <Button
                          color="primary"
                          disabled={performingAction}
                          variant="contained"
                          onClick={this.signOut}
                        >
                          Sign Out
                        </Button>
                      )
                    }
                  }
                }}
              />

              <Snackbar
                autoHideDuration={snackbar.autoHideDuration}
                message={snackbar.message}
                open={snackbar.open}
                onClose={this.closeSnackbar}
              />
            </>
          )}
        </ErrorBoundary>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.onAuthStateChangedObserver = auth.onAuthStateChanged(
      user => {
        // The user is not signed in or doesn’t have a user ID.
        if (!user || !user.uid) {
          if (this.userDocumentSnapshotListener) {
            this.userDocumentSnapshotListener();
          }

          this.resetState();

          return;
        }

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
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }

    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }
  }
}

export default App;
