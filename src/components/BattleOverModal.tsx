import React from 'react'
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Header,
    Image,
    Modal,
} from 'semantic-ui-react'

const BattleOverModal = ({
    heroCard,
    isOpen,
    setIsOpen,
    children
}: any) => {
    // const [open, setOpen] = React.useState(false)

    return (
        <Modal
            dimmer={'blurring'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={isOpen}
            // onOpen={() => setIsOpen(true)}
            // onClose={() => setIsOpen(false)}
            // trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>This battle is over</ModalHeader>
            <ModalContent>
                <p>Your level - {heroCard.level}</p>
                <p>Your coins - {heroCard.coins}</p>
                <p>Your crystals - {heroCard.crystals}</p>
            </ModalContent>
            <ModalActions>
                Start new game { children }
            </ModalActions>
        </Modal>
    )
}

export { BattleOverModal };