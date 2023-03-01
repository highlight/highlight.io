import Cookies from 'js-cookie'

// Same as what we have in frontend. Need to keep these in sync.
export const setAttributionData = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const referrer = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    device: urlParams.get('device'),
    gclid: urlParams.get('gclid'),
    referrer: urlParams.get('ref') || document.referrer,
    previousReferrer: Cookies.get('referrer'),
  }
  Cookies.set('referrer', JSON.stringify(referrer), { domain: 'highlight.io' })
}
