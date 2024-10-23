"use client";
import Icon from "@components/Icon";
import Calendar from "@containers/dashboard/calendar/Calendar";
import Profile from "@containers/dashboard/profile/Profile";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { getAuthUserData } from "@lib/redux/slices/auth/authSlice";
import {
  getCalendarByDates,
  updateNote,
} from "@lib/redux/slices/calendar/calendarSlice";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Auth.usersData);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  return (
    <div className="px-[30px] py-5">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-x-[35px]">
          <h3 className="font-semibold text-[22px]">Dashboard</h3>
        </div>
        <div className="flex items-center gap-x-[30px]">
          <Icon path="/icons/notifications.svg" />
          <Profile user={user} />
        </div>
      </header>
      <div className="flex gap-x-[20px]">
        <div className="w-[65vw]">
          <Calendar />
        </div>
        <div className="w-[25vw]">
          <Card className="p-3 flex-grow relative h-full">
            <CardHeader className="flex justify-between items-center font-semibold text-xl">
              Your psychologist
              <Icon
                path="/arrow-left.svg"
                className="rotate-180 cursor-pointer"
              />
            </CardHeader>
            <CardBody>
              <div className="mx-auto flex flex-col items-center gap-y-4 mt-8">
                <Avatar src="/avatar.png" className="w-[100px] h-[100px]" />
                <span className="font-semibold text-[17px]">Maria Vertigo</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
