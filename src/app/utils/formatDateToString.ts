import {  formatDate } from 'date-fns'

export const formatDateToString = (date: Date) => formatDate(date, "dd/MM/yyyy")