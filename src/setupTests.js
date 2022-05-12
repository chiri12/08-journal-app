//import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react';///no esta pinchando enzyme  en react 18 
import { createSerializer } from 'enzyme-to-json';
import {configure, Adapter} from 'Enzyme';

//Enzyme.configure({adapter: new Adapter() });
configure({adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
