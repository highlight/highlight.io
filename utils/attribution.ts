import Cookies from 'js-cookie'

interface Referrer {
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
  device?: string | null
  gclid?: string | null
  referrer?: string | null
  documentReferrer?: string | null
}

// Same as what we have in frontend. Need to keep these in sync.
export const setAttributionData = () => {
  let referrer: Referrer = {}
  const prevRef = Cookies.get('referrer')
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('utm_source')) {
    referrer = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
      device: urlParams.get('device'),
      gclid: urlParams.get('gclid'),
      referrer: urlParams.get('ref'),
    }
  } else if (prevRef) {
    referrer = JSON.parse(prevRef) as Referrer
  }
  referrer.documentReferrer = document.referrer
  Cookies.set('referrer', JSON.stringify(referrer), { domain: 'highlight.io' })
}
