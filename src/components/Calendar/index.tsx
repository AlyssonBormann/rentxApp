import React from "react";
import { useTheme } from "styled-components";

import {
  Calendar as CustomerCalendar,
  LocaleConfig,
  CalendarProps,
} from "react-native-calendars";

import { Feather } from "@expo/vector-icons";

import { generateInterval } from "./generateInterval";
import { ptBr } from "./LocaleConfig";

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomerCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400_regular,
        textDayHeaderFontFamily: theme.fonts.primary_500_medium,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600_SemiBold,
        textMonthFontSize: 20,
        textDayFontSize: 15,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarkedDateProps, DayProps, generateInterval };
