import { fireEvent, renderWithProviders, screen } from '@/test/test-utils'

import { HeroSection } from './HeroSection'

describe('HeroSection logo entrance', () => {
  it('keeps the logo hidden until the image loads, then plays the drop-in', () => {
    renderWithProviders(<HeroSection />)
    const logo = screen.getByTestId('hero-logo')

    expect(logo).toHaveClass('invisible')
    expect(logo).not.toHaveClass('motion-safe:animate-drop-in')

    fireEvent.load(logo.querySelector('img')!)

    expect(logo).not.toHaveClass('invisible')
    expect(logo).toHaveClass('motion-safe:animate-drop-in', 'motion-reduce:animate-fade-in')
  })

  it('still reveals the logo if the image fails to load', () => {
    renderWithProviders(<HeroSection />)
    const logo = screen.getByTestId('hero-logo')

    fireEvent.error(logo.querySelector('img')!)

    expect(logo).not.toHaveClass('invisible')
  })
})
