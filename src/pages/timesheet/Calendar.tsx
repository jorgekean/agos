import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { useGlobalContext } from "../../context/GlobalContext"
import locationData from "../../../src/worklocations.json"
import { SettingModel } from "../../models/SettingModel"
import DexieUtils from "../../utils/dexie-utils"
import { SettingsService } from "../settings/SettingsService"
import { TimesheetService } from "./TimesheetService"
import { TimesheetData } from "../../models/Timesheet"
import FuseCombobox from "../../components/shared/forms/FuseCombobox"
import { Button } from "@headlessui/react"
import { FaCalendarDay, FaLocationArrow } from "react-icons/fa"
import FuseTooltip from "../../components/shared/FuseTooltip"
import { GoMoveToEnd } from "react-icons/go"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface CalendarProps { }

const Calendar = ({ }: CalendarProps) => {
  const [isToday, setIsToday] = useState(false)

  const settingsDB = DexieUtils<SettingModel>({ tableName: "settings" })
  const timesheetsDB = DexieUtils<TimesheetData>({ tableName: "timesheet" })
  const {
    timesheetDate,
    setTimesheetDate,
    workLocations,
    setWorkLocations,
    timesheetWorkLocation,
    setTimesheetWorkLocation,
  } = useGlobalContext()

  const settingsService = SettingsService()
  const timesheetService = TimesheetService()

  useEffect(() => {
    // setTimesheetDate(timesheetDate);

    const fetchWorkLocations = async () => {
      try {
        setWorkLocations(locationData)

        const workLocationSetting = await settingsService.getSettingByType(
          "worklocation"
        )
        console.log("Work Location Setting:", workLocationSetting)
        if (workLocationSetting) {
          setTimesheetWorkLocation(
            locationData.find(
              (loc) => loc.id === workLocationSetting.value?.id
            ) || null
          )
        }

        const timesheets = await timesheetService.getTimesheetsOfTheDay()
        if (timesheets && timesheets.length > 0) {
          const firstTimesheetLocation = locationData.find((loc) =>
            timesheets
              .filter((timesheet) => timesheet.workLocation)
              .some((timesheet) => loc.id === timesheet.workLocation?.id)
          );
          setTimesheetWorkLocation(firstTimesheetLocation || null)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchWorkLocations()

    // set isToday
    setIsToday(timesheetDate?.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))
  }, [timesheetDate])

  const handleDateChange = (date: any) => setTimesheetDate(date)

  const handlePrevDay = () => {
    if (timesheetDate) {
      const prevDate = new Date(timesheetDate)
      prevDate.setDate(prevDate.getDate() - 1)
      setTimesheetDate(prevDate)
    }
  }

  const handleNextDay = () => {
    if (timesheetDate) {
      const nextDate = new Date(timesheetDate)
      nextDate.setDate(nextDate.getDate() + 1)
      setTimesheetDate(nextDate)
    }
  }

  const goToToday = () => {
    setTimesheetDate(new Date())
  }

  const handleWorkLocationChange = async (selectedItem: any) => {
    setTimesheetWorkLocation(selectedItem)

    const tsOfTheDay = await timesheetService.getTimesheetsOfTheDay()
    tsOfTheDay.forEach(async (ts) => {
      ts.workLocation = selectedItem
      await timesheetsDB.update(ts)
    })
  }

  return (
    <form className="flex items-center">
      <div className="flex items-center space-x-2 bg-primary5 dark:bg-gray-900/50 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* UPDATED: Buttons are now rounded with a subtle background on hover for better UX */}
        <button
          type="button"
          onClick={handlePrevDay}
          className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Previous Day"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>

        <DatePicker
          selected={timesheetDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy - EEE"
          // UPDATED: Cleaned up and modernized the styling with a clear 'today' state
          className={`
                    min-w-[280px] text-center font-semibold py-2 px-4 rounded-lg
                    border-2 transition-colors duration-200 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary2
                    ${isToday
              ? 'bg-white text-primary3 border-transparent'
              : 'bg-gray-200  hover:bg-gray-200 border-gray-300 text-gray-800'
            }
                    dark:bg-gray-800 dark:border-gray-600
                    ${isToday
              ? 'dark:bg-indigo-900/50 dark:text-indigo-300'
              : 'dark:text-gray-200 dark:hover:bg-gray-700/50'
            }
                `}
        />

        <button
          type="button"
          onClick={handleNextDay}
          className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Next Day"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>

        <FuseTooltip content="Go to today's timesheet">
          <button
            type="button"
            onClick={goToToday}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary2"
            aria-label="Go to Today"
          >
            {/* NEW: Using a more intuitive icon for 'Today' */}
            <FaCalendarDay className="h-5 w-5" />
          </button>
        </FuseTooltip>
      </div>
      {/* <div className="ml-auto w-1/3">
        <FuseCombobox
          placeholder="Select work location"
          items={workLocations}
          selectedItem={timesheetWorkLocation || null}
          onItemSelect={handleWorkLocationChange}
          labelKey={"description"}
          valueKey={"id"}
        />
      </div> */}
    </form>
  )
}

export default Calendar
