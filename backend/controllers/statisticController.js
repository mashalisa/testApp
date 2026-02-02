const statisticService = require('../services/statisticServices');

const testStatisticController = async (req, res) => {
  try {
    const { teacherId } = req.validatedParams;
    const authenticatedUserId = req.user.id;

    if (teacherId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const tests = await statisticService.getStatisticInfo(teacherId);

    return res.status(200).json({
      success: true,
      data: tests
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  testStatisticController
};
