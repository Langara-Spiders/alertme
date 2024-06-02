import {
  TamaguiProvider,
  View,
  XStack,
  YStack,
  Button,
  SizableText
} from 'tamagui'
import appConfig from './tamagui.config'


export default function App() {
  return (
    <TamaguiProvider config={appConfig}>
      <View margin={10} backgroundColor="white">
        <XStack
          height="100%"
          width="100%"
          padding="$2"
          alignItems="center"
          justifyContent="center">
          <YStack
            flex={1}
            gap="$10"
            justifyContent="center"
            alignItems="center">
            <YStack>
              <SizableText size="$10" fontWeight="bold">AlertMe</SizableText>
            </YStack>
            <YStack>
              <Button theme="blue">Login with Google</Button>
            </YStack>
            <YStack>
              <Button theme="blue">Login with Facebook</Button>
            </YStack>
          </YStack>
        </XStack>
      </View>
    </TamaguiProvider>
  );
}
