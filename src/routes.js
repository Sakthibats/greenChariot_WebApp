import WelcomePage from './components/WelcomePage.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Survey from './components/Survey.vue'
import Challenges from './components/Challenges.vue'
import SocialMedia from './components/SocialMedia.vue'
import SocialMediaChallenge from './components/SocialMediaChallenge.vue'
import Submission from './components/LinkSubmission.vue'
import Verify from './components/VerifyPhoto.vue'
import Success from './components/SubmissionSuccess.vue'

export default [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignUp, name: "signup" },
  { path: '/signin', component: SignIn, name: "signin" },
  { path: '/survey', component: Survey, name: "survey", props: true},
  { path: '/challenges', component: Challenges, name: "challenges", props: true},
  { path: '/socialmedia', component: SocialMedia, name: "socialmedia", props: true },
  { path: '/socialmediachallenge', component: SocialMediaChallenge, name: "socialmediachallenge", props: true },
  { path: '/submission', component: Submission, name: "submission", props: true },
  { path: '/verify', component: Verify, name: "verify", props: true },
  { path: '/success', component: Success, name: "success", props: true },
]