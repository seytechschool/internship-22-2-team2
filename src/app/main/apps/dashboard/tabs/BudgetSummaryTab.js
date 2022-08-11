import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectWidgets } from '../store/widgetsSlice';
import Widget10 from '../widgets/Widget10';
import Widget5 from '../widgets/Widget5';
import Widget8 from '../widgets/Widget8';
import Widget9 from '../widgets/Widget9';

function BudgetSummaryTab() {
  const widgets = useSelector(selectWidgets);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="widget flex w-full sm:w-3/4 p-12">
        <Widget5 widget={widgets.widget5} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/4 p-12">
        <Widget9 widget={widgets.widget9} />
      </motion.div>
    </motion.div>
  );
}

export default BudgetSummaryTab;
