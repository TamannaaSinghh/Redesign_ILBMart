import { library, config } from '@fortawesome/fontawesome-svg-core'
import { 
  faFacebookF, 
  faTwitter, 
  faYoutube, 
  faWhatsapp, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons'

// This fixes a Next.js hydration issue
config.autoAddCss = false

library.add(
  faFacebookF,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faInstagram
)