import React, { useState } from 'react'

import { Typography, Input, FormHelperText } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/user_main.svg'
import LoginBg2 from '../../../assets/bg/admin_load_queue.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR } from '../../../constants/ColorConstants'

import * as S from './style'

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontSize: '2rem',
    margin: '0 auto',
    marginBottom: '25px'
  },
  SECONDARY: {
    fontSize: '1.3em'
  }
}


// Step 1 = Code creation
// Step 2 = Send to email
// Step 3 = Not send to email
function Dashboard() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('PDCartxo')

  const handleChange = event => {
    setName(event.target.value)
  }

  const code = 'LojaCodigo123'
  const date = '20/20'

  if (step === 1)
    return (
      <Layout bg={LoginBg}>
        <Typography
          style={{ ...typographyStyles.TITLE, maxWidth: '50%' }}
          dangerouslySetInnerHTML={{ __html: t('admin#dashboard_yourCode') }} />
        <S.Container>
          <Input
            value={name}
            onChange={handleChange}
            inputProps={{ style: { textAlign: 'center', fontSize: '1.5rem', color: PRIMARY_COLOR, fontWeight: 900 } }}
            style={{ marginTop: '10px' }}
          />
          <FormHelperText style={{ textAlign: 'center', color: PRIMARY_COLOR }} >Nome da Fila</FormHelperText>
          <Input
            value={code}
            inputProps={{ style: { textAlign: 'center', color: PRIMARY_COLOR, fontSize: '1.5rem', fontWeight: 900 } }}
            style={{ marginTop: '25px' }}
          />
          <FormHelperText style={{ textAlign: 'center', color: PRIMARY_COLOR }}>Codigo naFila {date}</FormHelperText>
        </S.Container>
        <S.BottomContainer>
          <Typography variant="h4" style={{ ...typographyStyles.TITLE, fontSize: '1.8rem', marginBottom: '30px' }}>
            {t('admin#dashboard_sendToEmail')}
          </Typography>
          <Button style={{ marginBottom: '20px' }} type="active" forward onClick={() => setStep(2)}>
            {t('admin#dashboard_yes')}
          </Button>
          <Button variant="secondary" forward onClick={() => setStep(3)}>
            {t('admin#dashboard_no')}
          </Button>
        </S.BottomContainer>

      </Layout >
    )
  return (
    <Layout bg={LoginBg2}>

      <Typography variant="h3" style={{ ...typographyStyles.TITLE, maxWidth: '50%' }}>
        {t('admin#dashboard_thanks')}
      </Typography>
      <S.Container>
        {step === 2 && <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{ __html: t('admin#dashboard_emailSent') }}
        />}
        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{ __html: t('admin#dashboard_redirectToStoreQueue') }}
        />
      </S.Container>
    </Layout>
  )
}


export default Dashboard
