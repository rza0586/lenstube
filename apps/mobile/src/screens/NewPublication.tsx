import { zodResolver } from '@hookform/resolvers/zod'
import type { MobileThemeConfig } from '@lenstube/lens/custom-types'
import React, { useRef } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import type { z } from 'zod'
import { object, string } from 'zod'

import ActionHeader from '~/components/new/ActionHeader'
import Form from '~/components/new/Form'
import shakeForm from '~/helpers/form-shake'
import normalizeFont from '~/helpers/normalize-font'
import {
  useForm,
  useMobileTheme,
  usePlatform,
  useSafeAreaInsets
} from '~/hooks'

const styles = (themeConfig: MobileThemeConfig) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      backgroundColor: themeConfig.backgroudColor
    },
    text: {
      fontFamily: 'font-medium',
      fontSize: normalizeFont(12),
      color: themeConfig.secondaryTextColor
    }
  })

const formSchema = object({
  title: string().min(1),
  description: string().max(5000).optional()
})
export type FormData = z.infer<typeof formSchema>

export const NewPublication = () => {
  const { isIOS } = usePlatform()
  const { top } = useSafeAreaInsets()
  const { themeConfig } = useMobileTheme()
  const style = styles(themeConfig)
  const shakeRef = useRef(new Animated.Value(0))

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const onValid = () => {
    alert(form.getValues('title'))
  }

  const onInValid = () => {
    shakeForm(shakeRef)
  }
  return (
    <View style={[style.container, { top }]}>
      <ActionHeader onPost={() => form.handleSubmit(onValid, onInValid)()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={isIOS ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1, paddingHorizontal: 5 }}
        >
          <Form form={form} shakeRef={shakeRef} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
