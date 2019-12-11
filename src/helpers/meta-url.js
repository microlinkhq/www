export default url =>
  `https://meta.microlink.io/.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fcdn.microlink.io%2Flogo%2Flogo.svg&images=${`https://logo.clearbit.com/${
    new URL(url).hostname
  }`}`
