// ชื่อไฟล์ต้องตามนี้ เพราะ ตอน start app , jest มันจะมาหาไฟล์ชื่อนี้ ที่อยู่ใน src
// ถ้ามันเจอก้จะ exec ก่อนทำการ test อื่นๆ
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter:new Adapter()});