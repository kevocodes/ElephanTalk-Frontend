import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

function ConfirmationModal({
  isOpen,
  onOpenChange,
  action,
  actionText,
  title,
  description,
  loading,
}) {
  return (
    <>
      <Modal
        data-testid="confirmation-modal"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-semibold text-center">{title}</p>
              </ModalHeader>
              <Divider />
              <ModalBody className="pb-0">
                <p className="text-small">{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  data-testid="action-button"
                  color="danger"
                  variant="light"
                  onPress={action}
                  isLoading={loading}
                >
                  {actionText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
