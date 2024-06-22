import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CheckboxGroup,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { reportSchema } from "../../schemas/reportSchema";
import { TagCheckbox } from "./components/TagCheckbox";
import { toxicityTags } from "../../utils/getToxicityTag";

function ReportModal({
  isOpen,
  onOpenChange,
  action,
  actionText,
  title,
  description,
  loading,
}) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    await action(data);
    reset();
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-semibold text-center">{title}</p>
              </ModalHeader>
              <Divider />
              <ModalBody className="pb-0">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <CheckboxGroup
                      className="gap-4 pt-2"
                      label={description}
                      orientation="horizontal"
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.tags?.message}
                      classNames={{
                        wrapper: "flex flex-wrap gap-2 justify-center",
                        label: "text-small text-center",
                        errorMessage: "text-center",
                      }}
                    >
                      {Object.keys(toxicityTags).map((tag) => (
                        <TagCheckbox key={tag} value={toxicityTags[tag]}>
                          {toxicityTags[tag]}
                        </TagCheckbox>
                      ))}
                    </CheckboxGroup>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                  type="button"
                >
                  Close
                </Button>
                <Button
                  data-testid="action-button"
                  color="danger"
                  variant="light"
                  isLoading={loading}
                  type="submit"
                >
                  {actionText}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReportModal;
