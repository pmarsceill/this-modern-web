import { keyframes, styled } from '../stitches.config'

// Idea stolen from Mamuso's blog:
// https://github.com/mamuso/mamuso.dev/blob/main/components/Spinner.js

const Spinner: React.FC = () => {
  const spinnerSpin = keyframes({
    from: { left: '0' },
    to: { left: '-8rem' },
  })

  const SpinnerWrapper = styled('div', {
    width: '16px',
    height: '20px',
    fontFamily: '$monospace',
    color: '$secondary',
    fontSize: '$2',
    overflow: 'hidden',
    textAlign: 'left',
    position: 'relative',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 8px)',
  })

  const SpinnerContent = styled('div', {
    position: 'relative',
    width: '1000px',
    display: 'flex',
    animation: `${spinnerSpin} 0.75s steps(8) infinite`,
  })

  const SpinnerFrame = styled('span', {
    width: '16px',
    height: '20px',
    textAlign: 'center',
  })

  return (
    <SpinnerWrapper>
      <SpinnerContent>
        <SpinnerFrame>⣷</SpinnerFrame>
        <SpinnerFrame>⣯</SpinnerFrame>
        <SpinnerFrame>⣟</SpinnerFrame>
        <SpinnerFrame>⡿</SpinnerFrame>
        <SpinnerFrame>⢿</SpinnerFrame>
        <SpinnerFrame>⣻</SpinnerFrame>
        <SpinnerFrame>⣽</SpinnerFrame>
        <SpinnerFrame>⣾</SpinnerFrame>
      </SpinnerContent>
    </SpinnerWrapper>
  )
}

export default Spinner
