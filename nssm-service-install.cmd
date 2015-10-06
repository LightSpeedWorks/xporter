@pushd %~dp0
@call nssm-set-svc-app-name
%NSSM% install %SVC% %APP%
@popd
@pause
