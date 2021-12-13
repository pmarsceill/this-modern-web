const GlobalMicropub = () => {
  return (
    <>
      <link
        rel="authorization_endpoint"
        href="https://github-indieauth.herokuapp.com/auth"
      />
      <link
        rel="token_endpoint"
        href="https://github-indieauth.herokuapp.com/token"
      />
      <link rel="micropub" href="https://tmw-mp-enpoint.glitch.me/micropub" />
    </>
  )
}

export default GlobalMicropub
