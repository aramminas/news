import React,{Component} from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

// languages
import lang from '../../Lang/en/en.json';

const Layout = (ChildComponent) =>

    class LayoutContent extends Component {

        render() {
            const { ...rest} = this.props;

            return (
                <>
                    <Header {...rest}/>
                    <ChildComponent
                        {...rest}
                    />
                    <Footer lang={lang}/>
                </>
            );
        };
    }

export default Layout;