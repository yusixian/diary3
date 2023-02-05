import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons';
import { ReactComponent as homeSvg } from '../../assets/icons/home-icon.svg';
import { ReactComponent as addSvg } from '../../assets/icons/add-icon.svg';
import { ReactComponent as reminderSvg } from '../../assets/icons/reminder-icon.svg';
import { ReactComponent as settingsSvg } from '../../assets/icons/settings-icon.svg';

export function EntryNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={homeSvg} {...props} />;
}
export function AddNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={addSvg} {...props} />;
}
export function ReminderNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={reminderSvg} {...props} />;
}
export function SettingsNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={settingsSvg} {...props} />;
}

const DiaryIcons = {
  EntryNavIcon,
  AddNavIcon,
  ReminderNavIcon,
  SettingsNavIcon,
};
export const ICON_KEYS = Object.keys(DiaryIcons);
export default DiaryIcons;
