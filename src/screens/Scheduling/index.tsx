import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { format } from "date-fns/esm";

import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import ArrowSvg from "../../assets/arrow.svg";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

interface RentalPeriod {
  startedFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!rentalPeriod.startedFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar.");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startedFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {"\n"} data de início e {"\n"} fim do aluguel{" "}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startedFormatted}>
              {rentalPeriod.startedFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
