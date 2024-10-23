"use client";
import Icon from "@components/Icon";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  ScrollShadow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  getOneCalendar,
  getPrevCalendar,
  getNextCalendar,
  addCalendar,
  addTodayCalendar,
} from "@lib/redux/slices/calendar/calendarSlice";
import NoteItem from "./Note/NoteItem";
import formatDateToDayMonth from "@helpers/formatDateToDayMonth";
import ModalWrapper from "@components/Modal";
import { formatDateFromDateNow } from "@helpers/formatDateFromDateNow";
import formatDateToTime from "@helpers/formatDateToTime";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export default function Calendar() {
  const [addNoteValue, setAddNoteValue] = useState("");
  const [date, setDate] = useState(parseDate(formatDateFromDateNow()));

  const calendar = useAppSelector((state) => state.Calendar.oneCalendar);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getOneCalendar(date as any));
  }, [dispatch, date]);

  console.log(formatDateFromDateNow());
  useEffect(() => {
    const date = formatDateFromDateNow();
    console.log("Inside useEffect:", date);
    dispatch(addTodayCalendar({ date }));
  }, [dispatch]);

  const handlePrevCalendar = () => {
    if (calendar?._id) {
      dispatch(getPrevCalendar(calendar._id));
    } else {
      dispatch(getPrevCalendar(null));
    }
  };

  const handleSaveNewNote = async () => {
    try {
      await dispatch(
        addCalendar({
          time: formatDateToTime(Date.now()),
          note: addNoteValue,
          date: formatDateFromDateNow(),
        })
      ).unwrap();
      onClose();
      dispatch(getOneCalendar(date as any));
    } catch (error) {
      console.error("Error adding available date:", error);
    }
  };

  const handleNextCalendar = () => {
    if (calendar?._id) {
      dispatch(getNextCalendar(calendar._id));
    }
  };
  console.log(calendar);

  return (
    <Card className="p-3 relative h-full">
      <CardHeader className="flex justify-between items-center">
        <div className="font-semibold text-xl">Calendar</div>
        <div className="flex gap-3">
          <DatePicker
            label="Date"
            onChange={setDate}
            value={date}
            maxValue={today(getLocalTimeZone())}
          />
          <button className="cursor-pointer" onClick={handlePrevCalendar}>
            <Icon path="/arrow-left.svg" />
          </button>
          <button
            className="rotate-180 cursor-pointer"
            onClick={handleNextCalendar}
          >
            <Icon path="/arrow-left.svg" />
          </button>
        </div>
      </CardHeader>
      <CardBody className="flex flex-row gap-x-4">
        <div
          key={String(calendar?._id)}
          className="bg-[#1CA66F] bg-opacity-[0.1] p-3 rounded-[10px] flex flex-col justify-between w-full "
        >
          <ScrollShadow hideScrollBar className="max-h-[300px]">
            {calendar?.notes.map((note: any) => (
              <NoteItem key={note._id} currentCalendar={calendar} note={note} />
            ))}
          </ScrollShadow>

          <div>
            <Divider />
            <div className="text-[#1CA66F] pt-2 flex justify-center items-center gap-x-5">
              {formatDateToDayMonth(
                calendar === null || !calendar.date
                  ? String(new Date())
                  : String(calendar.date)
              )}
              <div className="cursor-pointer p-1 bg-[#1CA66F1A] rounded-[32px] relative">
                <ModalWrapper onOpenChange={onOpenChange} isOpen={isOpen}>
                  <ModalContent className="py-3">
                    {(onClose) => (
                      <>
                        <ModalHeader>Add Note</ModalHeader>
                        <ModalBody>
                          <div className="flex items-center gap-3">
                            <Input
                              label="Note"
                              size="sm"
                              onChange={(e) => setAddNoteValue(e.target.value)}
                              value={addNoteValue}
                            />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            className="font-semibold text-white w-full"
                            color="success"
                            onClick={() => {
                              handleSaveNewNote();
                            }}
                          >
                            Submit
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </ModalWrapper>
                <Dropdown>
                  <DropdownTrigger>
                    <div>
                      <Icon path="/icons/plus.svg " />
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu>
                    <DropdownItem key="evaluate">
                      <Tooltip
                        content="In development mode..."
                        placement="right"
                      >
                        <div className="flex gap-1">
                          <Icon path="icons/smile.svg" />
                          <span>Evaluate your current condition</span>
                        </div>
                      </Tooltip>
                    </DropdownItem>
                    <DropdownItem key="add-note" onClick={onOpen}>
                      <div className="flex gap-1">
                        <Icon path="icons/notes.svg" />
                        <span>Add a note</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
