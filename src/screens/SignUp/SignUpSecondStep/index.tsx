import React, { useState } from "react";
import { KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { Bullet } from "../../../components/Bullet";
import { BackButton } from "../../../components/BackButton";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import { Container, Header, Steps, Form, FormTitle } from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação.");
    }
    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais.");
    }
  }

  function handleBlack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBlack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Form>
            <FormTitle>02. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
