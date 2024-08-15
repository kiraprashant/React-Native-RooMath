/**
 * @format
 */

import {AppRegistry,useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store/Store';

const MainApp = () => {
    const ColorScheme = useColorScheme()

    return(
    <Provider store={Store}>
        <App /> 
    </Provider>
    
    )

};

AppRegistry.registerComponent(appName, () => App);
