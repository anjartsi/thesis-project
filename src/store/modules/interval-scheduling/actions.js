import globals from '../global/index';

const actions = {};
// copy the global state values into state
Object.assign(actions, globals.actions);

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

actions.addInterval = (context, { start, finish }) => {
  context.commit('createInterval', { start, finish });
  // This is the index of the latest interval
  const n = context.state.problemSize;
  // find the row to put this interval
  const rowNum = context.getters.getRowThatFits(n);
  // if necessary, create a new row
  if (rowNum >= context.state.rows.length) {
    context.commit('createNewRow');
  }
  context.commit('addIntervalToRow', { index: n, row: rowNum });
  context.dispatch('updateProblemSize', { n });
};

actions.removeInterval = (context, { index }) => {
  const { row } = context.getters.getInterval(index);
  context.commit('destroyInterval', { index, row });
  context.commit('removeRowIfEmpty', { row });
  const n = context.state.problemSize - 1;
  context.dispatch('updateProblemSize', { n });
};

// todo - changeInterval
actions.eft = (context) => {
  if (context.getters.solving) {
    if (!context.state.sorted) {
      context.commit('sortByFinishTime');
    }
    if (context.state.sortedByFinishTime.length > 0) {
      if (context.state.step % context.state.maxSteps === 0) {
        const earliestIndex = context.state.sortedByFinishTime[0];
        context.commit('addToSolution', { earliestIndex });
      } else if (context.state.step % context.state.maxSteps === 1) {
        const earliestIndex = context.state.solution[context.state.solution.length - 1];
        let nextIntervalIndex;
        let collided;
        for (let i = 0; i < context.state.sortedByFinishTime.length; i++) {
          nextIntervalIndex = context.state.sortedByFinishTime[i];
          collided = context.getters.getCollision(earliestIndex, nextIntervalIndex);
          if (collided) {
            context.commit('removeFromSorted', { index: i });
            i--;
          }
        }
      }
    } // end if (sortedByFinishTime.length > 0)
    context.commit('performStep');
    context.commit('checkIfSolved');
  } // end if (solving)
};


actions.loadFile = (context, payload) => {
  context.commit('loadStart');
  const text = payload.loadText.trim();
  const intervals = [];
  let valid = true;
  let msg = '';
  if (text.length === 0) return;
  // split the text by line
  let rows = text.split('\n');
  // if a line is empty, it ignore it
  rows = rows.filter((row) => row.trim().length > 0);
  const n = rows.length;
  rows.forEach((element, index) => {
    let correct = true;
    const row = element.trim().split(/\s+/);
    const start = Number.parseInt(row[0], 10);
    const finish = Number.parseInt(row[1], 10);
    correct = row.length === 2;
    correct = correct && start >= context.state.min;
    correct = correct && finish <= context.state.max;
    correct = correct && start < finish;
    if (correct) {
      intervals.push({ start, finish });
    } else {
      valid = false;
      msg = `Error on row ${index + 1} --> "${element}"`;
      context.commit('addLoadMessage', { err: true, msg });
    }
  });
  if (valid) {
    context.commit('changeProblemSize', { n });
    const oldProblemSize = context.state.problemSize;
    for (let i = 0; i < oldProblemSize; i++) {
      context.dispatch('removeInterval', { index: 0 });
    }
    intervals.forEach(element => context.dispatch('addInterval', element));
    context.commit('resetSolver');
  }
}; // end loadFile

export default actions;
