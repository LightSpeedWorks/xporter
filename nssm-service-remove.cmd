@pushd %~dp0
@call nssm-set-svc-app-name
net stop %SVC%
@pause
%NSSM% remove %SVC% confirm
@popd
@pause
