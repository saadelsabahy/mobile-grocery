import * as React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Subheading} from 'react-native-paper';
import {COLORS, Spaces} from '../../../constants/style';
import {calcFont} from '../../../constants/style/sizes';

interface ProductSectionStyles {
  container?: ViewStyle;
  labelStyle?: TextStyle;
}

interface ProductSectionProps extends ProductSectionStyles {
  label?: string;
}

const styles = StyleSheet.create<ProductSectionStyles>({
  container: {
    padding: calcFont(Spaces.medium),
    backgroundColor: COLORS.WHITE,
  },
  labelStyle: {fontSize: calcFont(17)},
});

const ProductSection: React.FC<ProductSectionProps> = ({label, children}) => (
  <View style={styles.container}>
    <Subheading style={styles.labelStyle}>{label}</Subheading>
    {children}
  </View>
);

export {ProductSection};
