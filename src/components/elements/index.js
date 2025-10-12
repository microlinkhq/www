import { withTitle } from 'helpers/hoc'

import { Link, LinkSolid } from './Link'
import AnimatedBox from './AnimatedBox'
import Badge from './Badge/Badge'
import BlockLink from './BlockLink'
import Box from './Box'
import Button from './Button'
import Caps from './Caps'
import Card from './Card/Card'
import Choose from './Choose'
import CodeCopy from './Codecopy'
import CodeEditor, { Code } from './CodeEditor/CodeEditor'
import Color from './Color/Color'
import Confetti from './Confetti'
import Container from './Container'
import Dot from './Dot/Dot'
import DotSpinner from './DotSpinner'
import Flex from './Flex'
import HeadingBase from './Heading'
import Hide from './Hide'
import Highlight from './Highlight'
import If from './If'
import Iframe from './Iframe/Iframe'
import IframeInline from './IframeInline/IframeInline'
import Image from './Image/Image'
import Input from './Input/Input'
import InputIcon from './Input/InputIcon'
import Label from './Label'
import LineBreak from './LineBreak'
import Meta from './Meta/Meta'
import Notification from './Notification/Notification'
import Placeholder from './Placeholder/Placeholder'
import PriceMonthly from './PriceMonthly'
import PricePicker from './PricePicker'
import Select from './Select/Select'
import Spinner from './Spinner'
import SubheadBase from './Subhead'
import Svg from './Svg'
import Terminal from './Terminal/Terminal'
import Text from './Text'
import Toggle from './Toggle/Toggle'
import Toolbar from './Toolbar'
import Tweet from './Tweet/Tweet'
import Unavatar from './Unavatar/Unavatar'
import Video from './Video/Video'

import {
  BackgroundSlider,
  BackgroundSliderContainer
} from './BackgroundSlider/BackgroundSlider'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

export {
  AnimatedBox,
  BackgroundSlider,
  BackgroundSliderContainer,
  Badge,
  BlockLink,
  Box,
  Button,
  Caps,
  Card,
  Choose,
  Code,
  CodeCopy,
  CodeEditor,
  Color,
  Confetti,
  Container,
  Dot,
  DotSpinner,
  Flex,
  Heading,
  Hide,
  Highlight,
  If,
  Iframe,
  IframeInline,
  Image,
  Input,
  InputIcon,
  Label,
  LineBreak,
  Link,
  LinkSolid,
  Meta,
  Notification,
  Placeholder,
  PriceMonthly,
  PricePicker,
  Select,
  Spinner,
  Subhead,
  Svg,
  Terminal,
  Text,
  Toggle,
  Toolbar,
  Tweet,
  Unavatar,
  Video
}
