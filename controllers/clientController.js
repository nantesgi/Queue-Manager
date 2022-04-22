const Patient = require('../models/patientModel');
// const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.callReception = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOneAndUpdate(
    {
      clientID: undefined,
      guicheID: undefined,
      blocked: false,
      $or: [
        { medical: { doctorID: undefined } },
        { medical: { description: { $ne: undefined } } },
      ],
    },
    { guicheID: req.user.deskID }
  );

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});

exports.skipReception = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.skipID,
    { $unset: { guicheID: '' }, $inc: { skipTimes: 1 } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });

  if (patient.skipTimes === 5) {
    await Patient.findByIdAndUpdate(patient._id, { blocked: true });
  }
});

exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.find({
    $or: [
      {
        healthCare: { cardID: req.body.cardID },
      },
      { CPF: req.body.CPFClient },
    ],
  });

  if (!client) {
    return next(new AppError(`No client found with ${req.body}!`, 404));
  }

  const patient = await Patient.findByIdAndUpdate(req.params.id, {
    name: client.name,
    clientID: client._id,
    $unset: { skipTimes: '' },
  });

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});
