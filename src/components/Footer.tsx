import { useAppSelector } from '../store'

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
      fill="currentColor"
    ></path>
  </svg>
)

const FacebookIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
    <path
      d="m22 16.19c0 3.64-2.17 5.81-5.81 5.81h-1.19c-.55 0-1-.45-1-1v-5.77c0-.27.22-.5.49-.5l1.76-.03c.14-.01.26-.11.29-.25l.35-1.91c.03-.18-.11-.35-.3-.35l-2.13.03c-.28 0-.5-.22-.51-.49l-.04-2.45c0-.16.13-.29999.3-.29999l2.4-.04001c.17 0 .3-.12999.3-.29999l-.04-2.40002c0-.17-.13-.29999-.3-.29999l-2.7.04001c-1.66.03-2.98 1.38999-2.95 3.04999l.05 2.75c.01.28-.21.5-.49.51l-1.2.02c-.17 0-.29999.13-.29999.3l.03 1.9c0 .17.12999.3.29999.3l1.2-.02c.28 0 .5.22.51.49l.09 5.7c.01.56-.44 1.02-1 1.02h-2.3c-3.64 0-5.81-2.17-5.81-5.82v-8.37c0-3.64 2.17-5.81 5.81-5.81h8.38c3.64 0 5.81 2.17 5.81 5.81z"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <circle cx="4.983" cy="5.009" r="2.188" fill="currentColor"></circle>
    <path
      d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
      fill="currentColor"
    ></path>
  </svg>
)

const Footer = () => {
  const socials = [
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: 'https://www.facebook.com/delawvery/'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://www.linkedin.com/company/delawvery-legal-delivery-services/'
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/delawvery'
    }
  ]
  const translations = useAppSelector((state) => state.auth.appTranslations)

  const footerTexts = translations.footer

  return (
    <div className="flex justify-center flex-col m-auto mt-10  text-center text-lg dark:text-slate-400 ">
      <p>{footerTexts.conectWithus}</p>
      <div className="flex items-center justify-center space-x-2 mt-4 flex-wrap">
        {socials.map((social) => (
          <a
            href={social.url}
            className="flex flex-none items-center justify-center rounded-full w-12 h-12 hover:bg-slate-200 transition-all dark:hover:bg-slate-700"
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <p className=" mt-8 font-light text-sm mb-2">
        © {new Date().getFullYear()} Delawvery
      </p>
    </div>
  )
}

export default Footer
