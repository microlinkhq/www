export const DPA_LEAD_REF = 'dpa'

export const DPA_MAILTO =
  'mailto:hello@microlink.io?subject=Signed%20DPA%20request&body=Hi%2C%20we%27d%20like%20a%20countersigned%20Microlink%20DPA.%0D%0A%0D%0ALegal%20entity%3A%0D%0AVAT%20number%3A%0D%0AUse%20case%20(for%20Annex%20I)%3A%0D%0ATransfer%20mechanism%20needed%20(EU%20SCCs%20%2F%20UK%20Addendum%20%2F%20Swiss%20amendments)%3A%0D%0A%0D%0AThanks!%0D%0A'

const MAILTO_BY_LEAD_REF = new Map([[DPA_LEAD_REF, DPA_MAILTO]])

export const toLeadMailto = (leadRef, fallback) =>
  MAILTO_BY_LEAD_REF.get(leadRef) ?? fallback
