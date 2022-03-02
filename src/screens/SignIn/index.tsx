import React, { useState } from "react";
import { Alert } from "react-native";
import * as Yup from "yup";
import { StatusBar, KeyboardAvoidingView, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { Container, Header, Title, SubTitle, Form, Footer } from "./styles";

export function SignIn() {
  const theme = useTheme();
  const navigate = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  function handleNewAccount() {
    navigate.navigate("SignUpFirstStep");
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um e-mail válido.")
          .required("E-mail obrigatório"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (erro) {
      if (erro instanceof Yup.ValidationError) {
        Alert.alert(erro.message);
      } else {
        const message = (erro as Error).message;
        Alert.alert(message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos {"\n"}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{"\n"}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={() => {
                handleSignIn();
              }}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              loading={false}
              enabled={true}
              onPress={handleNewAccount}
              light
              color={theme.colors.background_primary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
