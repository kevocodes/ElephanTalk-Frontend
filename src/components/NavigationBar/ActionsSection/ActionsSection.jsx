import { NavbarContent } from '@nextui-org/react'
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher'
import ActionButton from './ActionButton/ActionButton'
import { Icon } from '@iconify/react'
import HamburguerButton from './HamburgerButton/HamburguerButton'
import { Link } from 'react-router-dom'

function ActionsSection({ setIsMenuOpen, isMenuOpen }) {
  return (
    <NavbarContent as="div" justify="end">
          <ThemeSwitcher />

          <ActionButton
            variant="light"
            color="primary"
            className="sm:hidden flex"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HamburguerButton isMenuOpen={isMenuOpen} />
          </ActionButton>

          <ActionButton
            as={ Link }
            to="/login"
            variant="flat"
            color="danger"
            className="hidden sm:flex"
          >
            <Icon icon="octicon:sign-out-16" />
          </ActionButton>

        </NavbarContent>
  )
}

export default ActionsSection