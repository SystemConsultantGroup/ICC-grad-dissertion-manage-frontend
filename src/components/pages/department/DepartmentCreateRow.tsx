import { ClientAxios } from "@/api/ClientAxios";
import { DepartmentsResponse } from "@/api/_types/department";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import BasicRow from "@/components/common/rows/BasicRow/BasicRow";
import { Button, Group, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { KeyedMutator } from "swr";

interface DeptCreateFormInputs {
  name: string;
}

interface Props {
  mutate: KeyedMutator<DepartmentsResponse>;
}

function DepartmentCreateRow({ mutate }: Props) {
  const { onSubmit, getInputProps } = useForm<DeptCreateFormInputs>({
    initialValues: {
      name: "",
    },
    validate: {
      name: isNotEmpty("학과명을 입력해주세요."),
    },
  });
  const handleSubmit = async (values: DeptCreateFormInputs) => {
    try {
      await ClientAxios.post(API_ROUTES.department.post(), { name: values.name });
      showNotificationSuccess({
        message: `${values.name}를 추가하였습니다.`,
      });
      mutate();
    } catch (error) {
      /* empty */
    }
  };

  return (
    <BasicRow field="학과 추가">
      <form onSubmit={onSubmit(handleSubmit)}>
        <Group align="center">
          <TextInput {...getInputProps("name")} placeholder="학과명을 입력해주세요" />
          <Button key="create" type="submit">
            추가하기
          </Button>
        </Group>
      </form>
    </BasicRow>
  );
}

export default DepartmentCreateRow;
