import { loaderRef } from '../components/general/Loader';
const MethodHelper = {
  delay: async ms => {
    loaderRef.current.incLoader();
    await MethodHelper.delayWithoutLoading(ms);
    loaderRef.current.decLoader();
  },
  delayWithoutLoading: async ms => new Promise(resolve => { setTimeout(resolve, ms); }),
  isNumberic: str => {
    if (typeof str !== 'string') return false; // we only process strings!
    return !Number.isNaN(str) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         && !Number.isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
  },
}
export default MethodHelper;