'use client'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { UpdateBookingAction } from "@/action/UpdateBookingAction";
import styles from "@/styles/FontPage.module.css"

export default function UpdateBookingForm({ token,path }: { token: string,path:boolean }) {
    const [id, setId] = useState("");
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string>('')

    const handleUpdateBooking = async () => {
        try {
            const startDate = dayjs(checkInDate);
            const endDate = dayjs(checkOutDate);
            const differenceInDays = endDate.diff(startDate, 'day');

            if (differenceInDays > 3) {
                setError("The booking duration can't be more than 3 days.");
                return;
            }

            await UpdateBookingAction(
                id,
                startDate.format('YYYY/MM/DD'),
                endDate.format('YYYY/MM/DD'),
                token,
                path
            );
            setError('');
            console.log("Update booking successful");
        } catch (err) {
            setError('Update error');
            console.log("Err: ", err);
        }
    };

    return (
        <div className={`${styles.campgroundFont} w-[600px] h-[70%] bg-white rounded-[10px] opacity-60
        text-black bg-zinc-100 w-full pt-[30px] mt-[50px] hover:opacity-100 transition-opacity duration-300`}>
            <div className="text-black text-[2vw] text-center ">
                Update Booking Form
            </div>
            <form action={handleUpdateBooking} className="px-[20px] w-full text-black relative opacity-100 mt-[25px] mr-[40px]">
                <div className="relative opacity-100 ml-[15px] mt-[25px] mr-[40px]">
                    <div className="flex items-center w-full my-2">
                            <div className="w-full">
                                <label htmlFor="id" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                    Insert the booking_id that you want to edit
                                </label>
                                <input type="text" required id="id" name="id" placeholder="Insert Your Booking Id"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 
                                ml-[30px] focus:outline-none indent-3 w-full focus:border-blue-400 transition duration-300" 
                                value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                    </div>

                <div className="w-full flex flex-row justify-start mt-[20px]">
                        <div className="w-[50%]">
                            <label htmlFor="checkInDate" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                New Check In Date
                            </label>
                            <div className="ml-[30px]">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="w-[100%] mt-[7px] bg-white" value={checkInDate}
                                    onChange={(e) => { setCheckInDate(e) }} />
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="w-[50%]">
                            <label htmlFor="checkInDate" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                New Check Out Date
                            </label>
                        <div className="ml-[30px]">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker className="w-[100%] mt-[7px] bg-white" value={checkOutDate}
                                onChange={(e) => { setCheckOutDate(e) }} />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                    <div className="py-[40px] space-x-[20px] flex flex-col items-center">
                        <button
                            type="submit"
                            className="opacity-100 rounded-full w-full text-[20px] bg-[#ffa900] text-white ring-slate-600 p-[5px] py-[10px] 
                            duration-300 hover:bg-indigo-800">
                            Update booking
                        </button>
                    </div>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-[20px] py-1 px-3 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}