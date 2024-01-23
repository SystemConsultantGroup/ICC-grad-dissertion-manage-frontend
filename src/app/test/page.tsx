"use client";

/* eslint-disable react/jsx-key */
/* eslint-disable no-console */

import { DownloadButton } from "@/components/common/Buttons";
import { DatePicker } from "@/components/common/DatePicker";
import Modal from "@/components/common/Modal";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import {
  BasicRow,
  ButtonRow,
  FileRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { Button, Card, Container, Stack, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";

export default function TestPage() {
  const theme = useMantineTheme();
  const [ho, setHo] = useState(false);
  return (
    <Stack>
      <PageHeader title="테스트 페이지" description="대충 테스트를 하기 위해 만든 UI입니다" />
      <Card>
        <DatePicker />
        <Container />
        <SearchInput onChange={(s) => console.log(s)} />
        <DownloadButton link="/">히히</DownloadButton>
        <Modal
          opened={ho}
          onClose={() => setHo(false)}
          title="Hello, world!"
          buttonGroup={
            <>
              <Button>확인</Button>
            </>
          }
        >
          아히이항힌ㅇ히ㅏㅈ디허ㅐ재ㅓ
        </Modal>
      </Card>
      <Card>
        <RowGroup>
          <TitleRow title="안녕하세요!" subString="히히" />
        </RowGroup>
        <RowGroup>
          <BasicRow field="기본 행" /* fieldSize="sm" */>
            <BasicRow.Text>
              내용입니다! BasicRow는 fieldSize로 여백을 조절할 수 있습니다.
            </BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="좀 내용이 긴 기본 행" fieldSize="sm">
            <BasicRow.Text>
              좀 많이 긴 내용입니다. Lorem ipsum dolor sit amet. 나랏말싸미 뒹귁에 달아 이거 맞나
              대충 여백을 채우기 위한 글자들입니다. 가나다라마바사 아자차카타파하
            </BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <FileRow field="파일 행" name="개쩌는 파일.avi" url="." />
        </RowGroup>
        <RowGroup>
          <FileUploadRow field="파일업로드 행" />
        </RowGroup>
        <RowGroup>
          <TextAreaRow field="텍스트 행" />
        </RowGroup>
        <RowGroup>
          <ButtonRow buttons={[<Button>뒤로가기</Button>, <Button variant="light">히히</Button>]} />
        </RowGroup>
      </Card>
    </Stack>
  );
}
