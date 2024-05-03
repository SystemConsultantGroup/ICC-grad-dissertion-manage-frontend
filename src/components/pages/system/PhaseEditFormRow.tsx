import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import DateTimePicker from "@/components/common/DatePicker/DateTimePicker";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { BasicRow, RowGroup } from "@/components/common/rows";
import { Button, Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

interface PhaseEditFormInputs {
  start: Date | null;
  end: Date | null;
}

interface Props {
  id: number;
  title: string;
  start: string;
  end: string;
}

function GetDateTime(t: string): Date {
  const offset = 9 * 60 * 60 * 1000;
  const ctime = new Date(t).getTime() - offset;
  return new Date(ctime);
}

function PhaseEditFormRow({ id, title, start, end }: Props) {
  const { onSubmit, getInputProps } = useForm<PhaseEditFormInputs>({
    initialValues: {
      start: start !== null ? GetDateTime(start) : null,
      end: end !== null ? GetDateTime(end) : null,
    },
    validate: {
      start: isNotEmpty("년월일시를 입력해주세요."),
      end: isNotEmpty("년월일시를 입력해주세요."),
    },
  });

  const handleSubmit = async (values: PhaseEditFormInputs) => {
    try {
      await ClientAxios.put(API_ROUTES.phase.put(id), {
        start: values.start,
        end: values.end,
      });
      showNotificationSuccess({ message: `${title} 일정을 적용하였습니다.` });
    } catch (error) {
      /* empty */
    }
  };

  return (
    <RowGroup>
      <form onSubmit={onSubmit(handleSubmit)}>
        <BasicRow field={title}>
          <Group>
            <DateTimePicker
              {...getInputProps("start")}
              defaultValue={start !== null ? GetDateTime(start) : null}
            />{" "}
            -
            <DateTimePicker
              {...getInputProps("end")}
              defaultValue={end !== null ? GetDateTime(end) : null}
            />
            <Button key="edit" type="submit">
              즉시 실행
            </Button>
          </Group>
        </BasicRow>
      </form>
    </RowGroup>
  );
}

export default PhaseEditFormRow;
