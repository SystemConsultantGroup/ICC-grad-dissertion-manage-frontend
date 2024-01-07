"use client";

import { Button, Stack, Space, TextInput, PasswordInput, Select } from "@mantine/core";
import { isNotEmpty, isEmail, useForm } from "@mantine/form";
import { API_ROUTES } from "@/api/apiRoute";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { CommonApiResponse } from "@/api/_types/common";
import { RowGroup, BasicRow, TitleRow, ButtonRow } from "@/components/common/rows";
import useDepartments from "@/api/SWR/useDepartments";
import { useEffect } from "react";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
