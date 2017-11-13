require('assets/css/common.css');

import Conf from './conf';
import Common from './common';

import vueFilter from './vueFilter';

//解决click点击300毫秒延时问题
import FastClick from 'fastclick';
FastClick.attach(document.body);	

export default{
	Conf,Common
}