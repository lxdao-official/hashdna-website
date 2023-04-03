import React from 'react';
import { Tooltip, Box } from '@mui/material';
import SkillTag from './SkillTag';
/*
* 2023/3/18 13:11:46

这是一个React函数组件，名为"Skills"，它引入了Tooltip和Box等Material-UI库的组件，并从"./SkillTag"导入了一个名为"SkillTag"的自定义组件。
* 该组件用于显示一组技能标签，给定一个包含技能名称和水平等级的技能数组。
* 在渲染过程中，该组件会根据技能等级对技能数组进行排序，
* 并使用map()方法遍历数组，为每个技能返回一个Tooltip组件包装的SkillTag组件，以便在鼠标悬停时显示技能水平等级信息。
* 最终，这个组件通过export default语句进行导出，以便其他文件可以使用它。
*
* */
function Skills({ skills }) {
  return (skills || [])
    .sort((a, b) => {
      if (a.level === 'Senior' && b.level !== 'Senior') {
        return -1;
      }
      if (a.level === 'Intermediate' && b.level === 'Junior') {
        return -1;
      }
      if (a.level === 'Junior' && b.level !== 'Junior') {
        return 1;
      }
      return 0;
    })
    .map((skill) => {
      return (
        <Tooltip key={skill.name} title={skill.level} placement="top">
          <Box>
            <SkillTag text={skill.name} level={skill.level} />
          </Box>
        </Tooltip>
      );
    });
}

export default Skills;
