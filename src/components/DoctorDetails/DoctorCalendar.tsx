"use client";

import Icon from "@components/Icon";
import { formatDateFromDateNow } from "@helpers/formatDateFromDateNow";
import formatDateToDayMonth from "@helpers/formatDateToDayMonth";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import {
  addAvailableDate,
  deleteAvailableDate,
  getAvailableDates,
} from "@lib/redux/slices/doctorcalendar/doctorCalendarSlice";
import { DoctorCalendarType } from "@lib/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  DatePicker,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface DoctorCalendarProps {
  doctorId: string;
  loading: boolean;
}

export default function DoctorCalendar({
  doctorId,
  loading,
}: DoctorCalendarProps) {
  const dispatch = useAppDispatch();
  const [weekOffset, setWeekOffset] = useState(0);
  const calendar = useAppSelector((state) => state.doctorCalendar.calendar);
  const modalAdd = useDisclosure();
  const modalDelete = useDisclosure();

  // States for tracking the selected day and time slot for deletion
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [newDate, setNewDate] = useState(parseDate(formatDateFromDateNow()));
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    if (doctorId) {
      const timer = setTimeout(() => {
        dispatch(
          getAvailableDates({ doctorId, query: `?weekOffset=${weekOffset}` })
        );
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [dispatch, doctorId, weekOffset]);

  const handleSaveNewDate = async (date: string, time: string) => {
    try {
      await dispatch(addAvailableDate({ date, time })).unwrap();
      dispatch(
        getAvailableDates({ doctorId, query: `?weekOffset=${weekOffset}` })
      );
    } catch (error) {
      console.error("Error adding available date:", error);
    }
  };

  const handleNextWeek = () => setWeekOffset((prevOffset) => prevOffset + 1);
  const handlePreviousWeek = () => {
    if (weekOffset > 0) setWeekOffset((prevOffset) => prevOffset - 1);
  };

  const handleDeleteClick = (day, timeSlot) => {
    setSelectedDay(day);
    setSelectedTimeSlot(timeSlot);
    modalDelete.onOpen();
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(
        deleteAvailableDate({
          calendarId: selectedDay?._id,
          timeSlotId: selectedTimeSlot?._id,
        })
      ).unwrap();
      dispatch(
        getAvailableDates({ doctorId, query: `?weekOffset=${weekOffset}` })
      );
    } catch (error) {
      console.error("Error deleting available date:", error);
    } finally {
      modalDelete.onClose();
    }
  };

  const formatDate = (dateObject: any) => {
    const year = dateObject.year;
    const month = String(dateObject.month).padStart(2, "0");
    const day = String(dateObject.day).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {/* Modal for Adding New Date and Time */}
      <Modal isOpen={modalAdd.isOpen} onOpenChange={modalAdd.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Date and Time
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  label="Date"
                  value={newDate}
                  onChange={setNewDate}
                  minValue={today(getLocalTimeZone())}
                />
                <Input
                  placeholder="Time (11:00)"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleSaveNewDate(formatDate(newDate as any), newTime)
                  }
                  color="primary"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal for Confirming Deletion */}
      <Modal
        isOpen={modalDelete.isOpen}
        onOpenChange={modalDelete.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure that you want to delete {selectedTimeSlot?.time}{" "}
                from {formatDateToDayMonth(String(selectedDay?.date))}
              </ModalHeader>
              <ModalBody className="mb-4">
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="danger"
                  onPress={handleDeleteConfirm}
                >
                  Yes, Delete
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {!loading && (
        <Card className="p-3 mt-16 max-w-[1520px]">
          <CardHeader className="flex justify-between items-center">
            <div className="text-xl">Set Your Available dates</div>
            <Button onPress={modalAdd.onOpen} color="primary">
              Add New Time
            </Button>
            <div className="flex gap-3">
              <button onClick={handlePreviousWeek}>
                <Icon
                  path="arrow-left.svg"
                  className={`cursor-pointer ${
                    weekOffset > 0 ? "opacity-1" : "opacity-0"
                  }`}
                />
              </button>

              <button onClick={handleNextWeek}>
                <Icon
                  path="arrow-left.svg"
                  className="rotate-180 cursor-pointer"
                />
              </button>
            </div>
          </CardHeader>
          <CardBody className="flex flex-row gap-x-4">
            {calendar.slice(0, 7).map((day) => (
              <div
                key={
                  day._id
                    ? String(day._id)
                    : `day-${Math.random().toString(36).substr(2, 9)}`
                }
                className="bg-[#1CA66F] bg-opacity-[0.1] p-3 rounded-[10px] flex flex-col justify-between w-[200px]"
              >
                <ScrollShadow hideScrollBar className="max-h-[300px]">
                  {day.timeSlots.map((timeSlot) => (
                    <div
                      key={String(timeSlot._id)}
                      className="bg-[#1CA66F] bg-opacity-[0.1] p-2 flex items-center rounded mb-2"
                    >
                      <span>{timeSlot.time}</span>
                      <button
                        className="mr-0 ml-auto"
                        onClick={() => handleDeleteClick(day, timeSlot)}
                      >
                        <Trash color="red" size={20} />
                      </button>
                    </div>
                  ))}
                </ScrollShadow>

                <div>
                  <Divider />
                  <div className="text-[#1CA66F] pt-2 flex justify-center items-center">
                    {formatDateToDayMonth(String(day.date))}
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </>
  );
}
