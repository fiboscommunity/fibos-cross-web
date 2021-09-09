import React from 'react'
import Responsive from 'react-responsive'

export const Desktop = props => <Responsive {...props} minWidth={992} />
export const Tablet = props => <Responsive {...props} minWidth={769} maxWidth={991} />
export const Default = props => <Responsive {...props} minWidth={768} />
export const Mobile = props => <Responsive {...props} maxWidth={767} />

export const ScreenLarge = props => <Responsive {...props} minWidth={1880} />
export const ScreenMiddle = props => <Responsive {...props} minWidth={1101} maxWidth={1879} />
export const ScreenSmall = props => <Responsive {...props} maxWidth={1100} />

// export { default as AntdInput } from './AntdInput/AntdInput'
// export { default as AntdTouchableButton } from './AntdTouchableButton/AntdTouchableButton'
// export { default as BBSInfo } from './BBSInfo/BBSInfo'
// export { default as CheckModal } from './CheckModal/CheckModal'
// export { default as CountDown } from './CountDown/CountDown'
// export { default as DateRange } from './DateRange/DateRange'
// export { default as InfoArea } from './InfoArea/InfoArea'
export { default as Loading } from './Loading/Loading'
export { default as LoadingAni } from './LoadingAni/LoadingAni'
// export { default as LocalAntdSelect } from './LocalAntdSelect/LocalAntdSelect'
// export { default as LocalCheckDialog } from './LocalCheckDialog/LocalCheckDialog'
// export { default as LocalInfoDialog } from './LocalInfoDialog/LocalInfoDialog'
// export { default as LocalInputCom } from './LocalInputCom/LocalInputCom'
// export { default as LocalRadio } from './LocalRadio/LocalRadio'
// export { default as LocalRadioButton } from './LocalRadioButton/LocalRadioButton'
// export { default as LocalSelectCom } from './LocalSelectCom/LocalSelectCom'
// export { default as LocalSnackbars } from './LocalSnackbars/LocalSnackbars'
// export { default as LocalSwitch } from './LocalSwitch/LocalSwitch'
// export { default as TextAreaWithCount } from './TextAreaWithCount/TextAreaWithCount'
// export { default as MaterialTable } from './MaterialTable'
// export { default as PicturesWall } from './PicturesWall/PicturesWall'
// export { default as Spark } from './Spark/Spark'
// export { default as SpinWrapper } from './SpinWrapper/SpinWrapper'
// export { default as Touchable } from './Touchable/Touchable'
// export { default as TouchableButton } from './TouchableButton/TouchableButton'
// export { default as TouchableGrid } from './TouchableGrid/TouchableGrid'
// export { default as UploadAndRequest } from './UploadAndRequest/UploadAndRequest'
