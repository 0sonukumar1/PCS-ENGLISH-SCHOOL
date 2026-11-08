let obtained_marks = 0;

let obtained_students_array = [];
students_answer.forEach((sa, i) => {
  if (sa.student_class == "I") {
    let T_o_m = 0;
    sa.answers.forEach((a, a_indexi) => {
      if (a.opt === correct_ans[0].answers[a_indexi].opt) {
        //   console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/T");
        T_o_m = `${+T_o_m + 1}`;
      } else {
        //    console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/F");
      }
    });
    console.log(
      sa.student_class,
      sa.name,
      T_o_m,
      "/",
      correct_ans[0].answers.length,
    );

    obtained_students_array.push({
      name: sa.name,
      student_class: sa.student_class,
      T_o_m: T_o_m,
    });
  } else if (sa.student_class == "II") {
    let T_o_m = 0;
    sa.answers.forEach((a, a_indexi) => {
      if (a.opt === correct_ans[1].answers[a_indexi].opt) {
        //   console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/T");
        T_o_m = `${+T_o_m + 1}`;
      } else {
        //    console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/F");
      }
    });
    console.log(
      sa.student_class,
      sa.name,
      T_o_m,
      "/",
      correct_ans[0].answers.length,
    );

    obtained_students_array.push({
      name: sa.name,
      student_class: sa.student_class,
      T_o_m: T_o_m,
    });
  } else if (sa.student_class == "IV") {
    let T_o_m = 0;
    sa.answers.forEach((a, a_indexi) => {
      if (a.opt === correct_ans[2].answers[a_indexi].opt) {
        //   console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/T");
        T_o_m = `${+T_o_m + 1}`;
      } else {
        //    console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/F");
      }
    });
    console.log(
      sa.student_class,
      sa.name,
      T_o_m,
      "/",
      correct_ans[0].answers.length,
    );

    obtained_students_array.push({
      name: sa.name,
      student_class: sa.student_class,
      T_o_m: T_o_m,
    });
  } else if (sa.student_class == "VI") {
    let T_o_m = 0;
    sa.answers.forEach((a, a_indexi) => {
      if (a.opt === correct_ans[3].answers[a_indexi].opt) {
        //   console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/T");
        T_o_m = `${+T_o_m + 1}`;
      } else {
        //    console.table("Q:",a.Q,";","sa:",a.opt,";","ca",correct_ans[0].answers[a_indexi].opt,"/F");
      }
    });
    console.log(
      sa.student_class,
      sa.name,
      T_o_m,
      "/",
      correct_ans[0].answers.length,
    );

    obtained_students_array.push({
      name: sa.name,
      student_class: sa.student_class,
      T_o_m: T_o_m,
    });
  }
});

console.log(obtained_students_array);
