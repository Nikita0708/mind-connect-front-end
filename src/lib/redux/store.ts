import { configureStore } from '@reduxjs/toolkit'
import { authSlice, calendarSlice } from './slices'
import postSlice from './slices/posts/postSlice'
import doctorProfileSlice from './slices/doctorprofile/doctorProfileSlice'
import onePostslice from './slices/post/onePostslice'
import doctorDetailsSlice from './slices/doctordetails/doctorDetailsSlice'
import doctorCalendarSlice from './slices/doctorcalendar/doctorCalendarSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			Auth: authSlice,
			Calendar: calendarSlice,
			posts: postSlice,
			post: onePostslice,
			doctorProfile: doctorProfileSlice,
			doctorDetails: doctorDetailsSlice,
			doctorCalendar: doctorCalendarSlice,
		},
	})
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
