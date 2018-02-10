import * as React from 'react';
import Input from 'antd/lib/input';
import Form, { FormComponentProps, FormCreateOption } from 'antd/lib/form';

import './App.css';

const logo = require('./logo.svg');

interface CustomFormProps extends FormComponentProps {
  username: string;
}

class CustomForm extends React.Component<CustomFormProps, {}> {
  constructor(props: CustomFormProps) {
    super(props);
  }

  public render() {
    const { form: { getFieldDecorator }, username } = this.props;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                message: 'must have a username.',
                required: true
              }
            ]
          })(<Input placeholder="Username" />)}
        </Form.Item>
      </Form>
    );
  }
}

const mapPropsToFields = (props: CustomFormProps) => {
  const { username } = props;

  return {
    username: Form.createFormField({ value: username })
  };
};

const FormOptions: FormCreateOption<CustomFormProps> = { mapPropsToFields };

// throws a type error that 'form' is missing.
const WrappedCustomForm = Form.create(FormOptions)(CustomForm);

// This option correctly matches the types and includes the form prop.
// const WrappedCustomForm = Form.create()(CustomForm);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <WrappedCustomForm username="kevin" />
      </div>
    );
  }
}

export default App;
