import Cookies from 'js-cookie'

// Same as what we have in frontend. Need to keep these in sync.
export const setAttributionData = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const referrer = urlParams.get('ref') || document.referrer
  const originalReferrer = Cookies.get('referrer')

  if (referrer && !originalReferrer) {
    Cookies.set('referrer', referrer, { domain: 'highlight.io' })
  }
}
