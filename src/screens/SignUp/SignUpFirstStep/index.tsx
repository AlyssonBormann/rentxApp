import React, { useState } from "react";
import { KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { Bullet } from "../../../components/Bullet";
import { BackButton } from "../../../components/BackButton";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

export function SignUpFirstStep() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  function handleBlack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH obrigatório"),
        email: Yup.string()
          .email("Digite um e-mail válido")
          .required("E-mail obrigatório"),
        name: Yup.string().required("Nome obrigatório"),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (erro) {
      if (erro instanceof Yup.ValidationError) {
        return Alert.alert(erro.message);
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
          <Header>
            <BackButton onPress={handleBlack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua {"\n"}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápido e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
